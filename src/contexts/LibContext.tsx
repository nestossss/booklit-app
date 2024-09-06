import React, { createContext, useState } from "react";

const LibContext: React.Context<[Library, React.Dispatch<React.SetStateAction<Library>>] | undefined>  = createContext(undefined);


export { 
   LibContext,
   Library,
} 

interface Library {
   salvos: Array<Record> | null,
   terminados: Array<Record> | null, 
   sendoLidos: Array<Record> | null,  
}

interface Record {
   livro: {
      idlivro: number,
      temBookUrl: boolean,
      bookUrl: string,
      titulo: string,
      sinopse: string,
      totalPag: number,
      imgUri: string,
      autores?: Array<string>,
      generos?: Array<string>
  },
  paginasLidas: number,
  tempoLido: number
}