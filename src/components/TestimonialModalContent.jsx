function TestimonialModalContent({ testimonial }) {
  if (!testimonial) return null;
  
  return (
    <>
      <div className="testimonial-modal-header">
        <figure className="testimonial-modal-avatar">
          <img src={testimonial.avatar} alt={testimonial.name} width="100" />
        </figure>

        <div className="testimonial-modal-title-wrapper">
          <h3 className="h3 testimonial-modal-title">{testimonial.name}</h3>
          <time dateTime="2023-06-14">14 June, 2023</time>
        </div>

        <img
          src="https://i.postimg.cc/mZ00RwX7/icon-quote.png"
          alt="quote icon"
          className="testimonial-quote-icon"
        />
      </div>

      <div className="testimonial-modal-content">
        <p>{testimonial.text}</p>
      </div>
    </>
  );
}

export default TestimonialModalContent;