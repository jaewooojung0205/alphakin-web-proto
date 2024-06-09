import dayjs from "dayjs";

interface NoteItemProps {
  note: INote;
}

export default function NoteItem(props: NoteItemProps) {
  const { note } = props;
  const date = dayjs(note.createdAt);
  const formattedDate = date.format("YYYY년 M월 D일 HH시 MM분");
  return (
    <div className="p-5 border rounded-[6px]">
      {note.title !== "" && (
        <div className="mb-1 pb-1 border-b font-semibold">{note.title}</div>
      )}
      <div className="mb-2">{note.content}</div>
      <div className="text-xs">{formattedDate}</div>
    </div>
  );
}
