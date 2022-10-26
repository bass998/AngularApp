export interface IEmployee {
    Id: string;
    EmployeeName: string;
    StarTimeUtc: Date;
    EndTimeUtc: Date;
    EntryNotes: string;
    DeletedOn?: Date;
}