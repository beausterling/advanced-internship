import Image from "next/image";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { Book } from "@/types/book";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.id}`} className="book__card">
      {book.subscriptionRequired && <div className="book__pill">Premium</div>}
      <figure className="book__card--img-mask">
        <Image
          className="book__card--img"
          src={book.imageLink}
          alt={book.title}
          width={172}
          height={172}
        />
      </figure>
      <div className="book__card--title">{book.title}</div>
      <div className="book__card--author">{book.author}</div>
      <div className="book__card--sub-title">{book.subTitle}</div>
      <div className="book__card--details-wrapper">
        <div className="book__card--details">
          <AiOutlineStar className="book__card--details-icon" />
          {book.averageRating}
        </div>
      </div>
    </Link>
  );
}
