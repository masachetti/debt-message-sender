const executeCheckMethod = (checkMethod: () => boolean) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(checkMethod()), 100);
  });
};

// TODO: Adicionar um parametro de maximo tentativas pra barrar uma possivel promise infinita
export default function doPromiseLoopUntilTrue(
  checkMethod: () => boolean
): Promise<void> {
  return executeCheckMethod(checkMethod).then((result) => {
    if (!result) return doPromiseLoopUntilTrue(checkMethod);
  });
}
