// @ts-check
const { join, normalize } = require("path");

const CODE_GEN_ROOT = normalize(join(__dirname, "..", "..", "codegen"));

const getCodeGenDirRoot = (dir) => join(CODE_GEN_ROOT, dir);
const CODE_GEN_SDK_ROOT = getCodeGenDirRoot("sdk-codegen");

const TEMP_CODE_GEN_INPUT_DIR = normalize(join(__dirname, ".aws-models"));
const DEFAULT_CODE_GEN_INPUT_DIR = normalize(join(CODE_GEN_SDK_ROOT, "aws-models"));

const getCodeGenOutputDir = (dir) =>
  normalize(join(__dirname, "..", "..", "codegen", dir, "build", "smithyprojections", dir));
const CODE_GEN_SDK_OUTPUT_DIR = getCodeGenOutputDir("sdk-codegen");
const TEMP_CODE_GEN_SDK_OUTPUT_DIR = normalize(join(__dirname, ".sdk-codegen"));

module.exports = {
  CODE_GEN_ROOT,
  CODE_GEN_SDK_ROOT,
  CODE_GEN_SDK_OUTPUT_DIR,
  DEFAULT_CODE_GEN_INPUT_DIR,
  TEMP_CODE_GEN_INPUT_DIR,
  TEMP_CODE_GEN_SDK_OUTPUT_DIR,
};
