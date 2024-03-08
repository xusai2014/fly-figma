// This plugin will generate a sample codegen plugin
// that appears in the Element tab of the Inspect panel.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This provides the callback to generate the code.

import {generateCode, traverse} from "./utils";
figma.codegen.on('generate', async (event:any) => {
    const data = await traverse(event.node);
    const code = generateCode(data)
    return [
        {
            language: "PLAINTEXT",
            code: code,
            title: "Vue generate code",
        },
    ];
});
