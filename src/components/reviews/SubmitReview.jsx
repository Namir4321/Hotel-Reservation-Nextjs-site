"use client";
import { useState } from "react";
import SubmitButton from "@/components/form/Submit";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "@/components/form/RatingInputComponent";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createReviewAction } from "@/utils/action";
import TextAreaInput from "@/components/form/TextAreaInput";
import RatingInputComponent from "@/components/form/RatingInputComponent";
const SubmitReview = ({ propertyId }) => { 
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  return (
    <div className="mt-8">
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        Leave a Review
      </Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInputComponent name="rating" />
            <TextAreaInput
              name="comment"
              labelText="your thoughts on this property"
              defaultValue="Amazing Place !!!"
            />
            <SubmitButton
              text="Submit"
              className="mt-4"
            />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
