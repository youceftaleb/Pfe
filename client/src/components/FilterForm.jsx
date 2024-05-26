import { Wilaya } from "../data/wilaya";

export const FilterForm = () => {
   
  return (
    <form className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <select defaultValue="" className="select select-bordered w-full max-w-xs">
              <option value="" disabled>
                Localisation
              </option>
              {Wilaya.map((wilaya, index) => (
                <option value={parseInt(wilaya.Code)} key={index}>
                  {wilaya.Code} - {wilaya.Wilaya}
                </option>
              ))}
            </select>
          </li>
          <li>
            <a>Filter 2</a>
          </li>
          <li>
            <a>Filter 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button type="submit" className="btn btn-primary">
          Filter
        </button>
      </div>
    </form>
  );
};
