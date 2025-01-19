import TagCard from '@/components/cards/TagCards';
import DataRenderer from '@/components/DataRenderer';
import LocalSearch from '@/components/search/LocalSearch';
import ROUTES from '@/constants/routes';
import { EMPTY_TAGS } from '@/constants/states';
import { getTags } from '@/lib/actions/tag.action';

const Tags = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags } = (data || {}) as { tags: Tag[] }; // Type assertion here

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-11">
        <LocalSearch route={ROUTES.TAGS} imgSrc="/icons/search.svg" placeholder="Search tags..." className="flex-1" />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={tags}
        empty={EMPTY_TAGS}
        render={(
          tags: Tag[] // Type the render prop
        ) => (
          <div className="mt-10 flex w-full flex-wrap justify-center gap-4">
            {tags.map(tag => (
              <TagCard key={tag._id} _id={tag._id} name={tag.name} questions={tag.questions} showCount />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Tags;
