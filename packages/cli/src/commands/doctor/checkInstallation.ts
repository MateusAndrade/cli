import semver from 'semver';
import commandExists from 'command-exists';
import resolveGlobal from 'resolve-global';

export enum PACKAGE_MANAGERS {
  YARN = 'YARN',
  NPM = 'NPM',
}

export enum GLOBAL_NATIVE_PACKAGES {
  REACT_NATIVE = 'react-native',
  REACT_NATIVE_CLI = 'react-native-cli',
}

const isSoftwareNotInstalled = async (command: string): Promise<boolean> => {
  try {
    await commandExists(command);

    return false;
  } catch (_ignored) {
    return true;
  }
};

const doesSoftwareNeedToBeFixed = ({
  version,
  versionRange,
}: {
  version: string;
  versionRange: string;
}): boolean => {
  const coercedVersion = semver.coerce(version);

  return (
    version === 'Not Found' ||
    coercedVersion === null ||
    !semver.satisfies(coercedVersion, versionRange)
  );
};

const isPackageGloballyInstalled = (
  packageName: GLOBAL_NATIVE_PACKAGES,
): boolean => {
  return Boolean(resolveGlobal(packageName));
};

export {
  isSoftwareNotInstalled,
  isPackageGloballyInstalled,
  doesSoftwareNeedToBeFixed,
};
