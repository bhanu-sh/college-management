export default function CollegePage({ params }: any) {
  return (
    <div>
      <h1>College Page</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
