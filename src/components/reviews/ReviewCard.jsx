import {Card ,CardContent,CardHeader} from "@/components/ui/card";
import Rating from "@/components/reviews/Rating";
import Comments from "@/components/reviews/Comments";


const ReviewCard = ({reviewInfo,children}) => {
  const {comment,rating,name,image}=reviewInfo;
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <img
            src={image}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">{name}</h3>
            <Rating rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comments comment={comment} />
      </CardContent>
      {/* delte button */}
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}

export default ReviewCard