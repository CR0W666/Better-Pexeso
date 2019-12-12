function mode(mode) {
  import("./Logic.js").then(module => {
    const Logic = module.Logic;
    const logic = new Logic();
    logic.mode(mode);
  });
}
