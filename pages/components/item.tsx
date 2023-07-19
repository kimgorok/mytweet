import Link from "next/link";

interface ItemProps {
  // id
  id: number;
  // tweet
  text: string;
  //fav
  hearts: number;
}

export default function Item({ text, hearts, id }: ItemProps) {
  return (
    <Link legacyBehavior href={`/tweets/${id}`}>
      <a>
        <div>
          <div />
          <div>
            <span>{text}</span>
          </div>
        </div>
        <div>
          <div>
            <span>{hearts}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
