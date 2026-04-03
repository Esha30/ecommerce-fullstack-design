import BlockDetail from './BlockDetail'
import SideItems from './SideItems';

export default function SectionTwo({ product }) {
  return (
    <div className="hidden sm:flex w-full max-w-[1180px] gap-5 items-start">
      {/* Description Tabs */}
      <BlockDetail product={product} />
      {/* You may like — sidebar */}
      <SideItems />
    </div>
  );
}
