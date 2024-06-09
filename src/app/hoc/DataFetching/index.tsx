import NotesFetching from "./NotesFetching";
import UserFetching from "./UserFetching";

interface DataFetchingProps {
  children: React.ReactNode;
}

export default function DataFetching(props: DataFetchingProps) {
  const { children } = props;
  return (
    <UserFetching>
      <NotesFetching>{children}</NotesFetching>
    </UserFetching>
  );
}
