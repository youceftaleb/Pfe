import { EnseignantCard } from ".";

export const CardGroup = ({ enseignats }) => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-6 md:grid-cols-2 bg-slate-200 pt-7 text-center">
      {enseignats?.length ? (
        enseignats?.map((ens, index) => (
          <div key={index}>
            <EnseignantCard enseignat={ens} />
          </div>
        ))
      ) : (
        <div className="w-full text-center text-xl mx-auto">
          <h1 className="text-center">aucun enseignant trouve</h1>
        </div>
      )}
    </div>
  );
};
