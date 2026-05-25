import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const env = readLocalEnv();
const repo = process.env.SHIFTLESS_PATH ?? env.SHIFTLESS_PATH ?? "/home/kayla/Programming/C#/Shiftless.VoxelEngine";
const ref = process.env.SHIFTLESS_REF ?? env.SHIFTLESS_REF ?? "main";
const outTextureDir = "public/img/shiftless/blocks";
const outDataPath = "public/data/shiftless-blocks.json";
const textureRoot = "Shiftless.Procession/content/core/assets";

const faces = ["up", "down", "north", "south", "east", "west"];

function readLocalEnv() {
  const envPath = ".env.local";
  if (!existsSync(envPath)) {
    return {};
  }

  const values = {};
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*$/);
    if (!match) {
      continue;
    }

    values[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }

  return values;
}

function gitText(path) {
  return execFileSync("git", ["-C", repo, "show", `${ref}:${path}`], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8
  });
}

function gitBuffer(path) {
  return execFileSync("git", ["-C", repo, "show", `${ref}:${path}`], {
    maxBuffer: 1024 * 1024 * 16
  });
}

function listFiles(pattern) {
  return execFileSync("git", ["-C", repo, "ls-tree", "-r", "--name-only", ref], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8
  })
    .split(/\r?\n/)
    .filter((path) => pattern.test(path));
}

function firstStringArg(source, constructorName) {
  const match = source.match(new RegExp(`${constructorName}\\s*\\([^"']*["']([^"']+)["']`, "s"));
  return match?.[1] ?? null;
}

function namedArg(source, name) {
  const match = source.match(new RegExp(`${name}\\s*:\\s*["']([^"']+)["']`));
  return match?.[1] ?? null;
}

function displayNameFromId(id) {
  return id
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function textureUrl(texturePath) {
  return `img/shiftless/blocks/${basename(texturePath)}`;
}

function copyTexture(texturePath) {
  const sourcePath = `${textureRoot}/${texturePath}`;
  const outputPath = join(outTextureDir, basename(texturePath));
  writeFileSync(outputPath, gitBuffer(sourcePath));
  return textureUrl(texturePath);
}

function allFaces(texturePath) {
  return Object.fromEntries(faces.map((face) => [face, texturePath]));
}

function grassFaces(topPath, sidePath, bottomPath) {
  return {
    up: topPath,
    down: bottomPath,
    north: sidePath,
    south: sidePath,
    east: sidePath,
    west: sidePath
  };
}

function pillarFaces(sidePath, endPath) {
  return {
    up: endPath,
    down: endPath,
    north: sidePath,
    south: sidePath,
    east: sidePath,
    west: sidePath
  };
}

function parseBlockModel(className, source) {
  if (source.includes(": LogBlock")) {
    return {
      model: "pillar",
      faces: pillarFaces(namedArg(source, "sideTexturePath"), namedArg(source, "endTexturePath"))
    };
  }

  const simpleTexture = firstStringArg(source, "base");
  if (simpleTexture) {
    return { model: "cube", faces: allFaces(simpleTexture) };
  }

  if (source.includes("GrassBlockModel")) {
    return {
      model: "grass",
      faces: grassFaces(
        namedArg(source, "topPath"),
        namedArg(source, "sidePath"),
        namedArg(source, "bottomPath")
      )
    };
  }

  if (source.includes("PillarBlockModel")) {
    return {
      model: "pillar",
      faces: pillarFaces(namedArg(source, "sidePath"), namedArg(source, "endPath"))
    };
  }

  throw new Error(`Unsupported block model pattern for ${className}`);
}

function parseRegistry() {
  const source = gitText("Shiftless.Procession.Core/Blocks/BlockRegistry.cs");
  const entries = [];
  const pattern = /RegisterItem<([^>]+)>\("([^"]+)",\s*new\(\)\)/g;
  let match;
  while ((match = pattern.exec(source))) {
    entries.push({ className: match[1], id: match[2] });
  }
  return entries;
}

mkdirSync(outTextureDir, { recursive: true });
mkdirSync("public/data", { recursive: true });
rmSync(outTextureDir, { recursive: true, force: true });
mkdirSync(outTextureDir, { recursive: true });

const blockFiles = new Map();
for (const path of listFiles(/^Shiftless\.Procession\.Core\/Blocks\/.+\.cs$/)) {
  const source = gitText(path);
  const match = source.match(/\b(?:class|record)\s+([A-Za-z_][A-Za-z0-9_]*)\b/);
  if (match) {
    blockFiles.set(match[1], path);
  }
}

const blocks = parseRegistry().map(({ className, id }) => {
  const filePath = blockFiles.get(className);
  if (!filePath) {
    throw new Error(`Could not find source file for ${className}`);
  }

  const parsed = parseBlockModel(className, gitText(filePath));
  const copiedFaces = {};

  for (const [face, texturePath] of Object.entries(parsed.faces)) {
    if (!texturePath) {
      throw new Error(`Missing ${face} texture for ${className}`);
    }

    copiedFaces[face] = copyTexture(texturePath);
  }

  return {
    id,
    name: displayNameFromId(id),
    sourceClass: className,
    model: parsed.model,
    faces: copiedFaces
  };
});

const data = {
  source: {
    repo,
    ref,
    extractedAt: new Date().toISOString()
  },
  meshFormat: "cube-faces-v1",
  blocks
};

writeFileSync(outDataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Exported ${blocks.length} Shiftless blocks to ${outDataPath}`);
