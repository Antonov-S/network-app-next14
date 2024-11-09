type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;
  return (
    <div>
      <h1>Personal page {id}</h1>
    </div>
  );
}
