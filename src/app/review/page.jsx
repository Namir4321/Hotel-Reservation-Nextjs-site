import EmptyList from "@/components/home/EmptyList";
import { deleteReviewAction, fetchPropertyReviewByUser } from "@/utils/action";
import ReviewCard from "@/components/reviews/ReviewCard";
import Title from "@/components/properties/Title";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Submit";
const ReviewPage = async () => {
  const reviews = await fetchPropertyReviewByUser();
  if (reviews.length === 0) return <EmptyList />;
  return <>
  <Title text='Yor Reviews'/>
  <section className="grid md:grid-cols-2 gap-8 mt-4">
    {reviews.map((review)=>{
      const {comment,rating}=review;
      const {image,name}=review.property;
      const reviewInfo = {comment,rating,image,name};
      return <ReviewCard key={review.id} reviewInfo={reviewInfo}>
        <DeleteReview reviewId={review.id}/>
      </ReviewCard>
    })}
  </section>
  </>;
};

const DeleteReview=({reviewId})=>{
  const deleteReview=deleteReviewAction.bind(null,{reviewId})
  return <FormContainer action={deleteReview}>
    <IconButton actionType='delete'/>
  </FormContainer>
}

export default ReviewPage;
