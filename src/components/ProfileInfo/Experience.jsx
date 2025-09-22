import { formatDate } from "../../utils";

const Experience = ({ profile, deleteExperience }) => {
  return (
    <div>
      {profile.experience.map((exp) => (
        <div key={exp._id} className="container">
          <div>
            {deleteExperience && (
              <a href="#!" onClick={() => deleteExperience(exp._id)}>
                <i className="fas fa-trash delete"></i>
              </a>
            )}
            <p>
              &#128188; {exp.current ? "Works" : "Worked"} as <b>{exp.title}</b> at{" "}
              <b>{exp.company}</b>
            </p>
            <small>
              from {formatDate(exp.from)} to{" "}
              {exp.current ? "Current" : formatDate(exp.to)}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
