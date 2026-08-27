import { registerAll, toastError } from "@eclipse-docks/core";
import { PyEnv } from "./pyservice";

registerAll({
  command: {
    id: "python.runCode",
    name: "Run Python Code",
    description: "Runs Python code.",
    keyBinding: "CTRL+R",
    parameters: [
      {
        name: "code",
        description: "Python code to execute",
        required: true
      }
    ]
  },
  handler: {
    execute: async (context: any) => {
      const code: string | undefined = context.params?.code;
      if (!code) {
        toastError("No Python code provided.");
        return;
      }
      const pyenv = new PyEnv();
      await pyenv.init({ params: context.params });
      return await pyenv.execCode(code);
    }
  }
});

