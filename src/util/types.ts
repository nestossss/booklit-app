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

export { StreakMonth, StreakDay, StreakData }