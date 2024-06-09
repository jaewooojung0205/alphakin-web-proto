type NoteClassification = "none" | "reminder" | "idea" | "paper";

// Database
interface INoteDB {
  title: string;
  content: string;
  classification: NoteClassification;
  creator: string; // user id
  createdAt: number;
  updatedAt: number;
}

interface INote extends INoteDB {
  id: string;
}

interface IUserDB {
  name: string;
}

interface IUser extends IUserDB {
  id: string;
}
