/* Library Types */
interface Library {
   salvos: Array<Record> | null,
   terminados: Array<Record> | null, 
   sendoLidos: Array<Record> | null,  
}

interface Record {
   livro: Book,
   paginasLidas: number,
   tempoLido: number
}

interface Book {
   idlivro?: number,
   temBookUrl: boolean,
   bookUrl: string,
   titulo: string,
   sinopse: string,
   totalPag: number,
   imgUri: string,
   autores?: Array<string>,
   generos?: Array<string>
}

/* Streak types */
interface StreakMonth {
   year: number,
   monthIndex: number, 
   days: Array<StreakDay>
}
interface StreakDay {
   day: number,
   weekdayIndex: number,
   status: "unchecked" | "checked" | null,
}

interface StreakData {
   streakId: number,
   start: Date,
   end: Date,
}

export type { StreakMonth, StreakDay, StreakData, Library, Record, Book};