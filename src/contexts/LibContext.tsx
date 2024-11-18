import React, { createContext, useState } from "react";
import type { Library } from "../util/types";

const LibContext: React.Context<[Library, React.Dispatch<React.SetStateAction<Library>>] | undefined>  = createContext(undefined);

export { 
   LibContext,
}