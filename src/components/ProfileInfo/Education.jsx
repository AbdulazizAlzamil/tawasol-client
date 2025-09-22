import { formatDate } from "../../utils";

const Education = ({ profile, deleteEducation }) => {
  return (
    <div>
      {profile.education.map((edu) => (
        <div key={edu._id} className="container">
          <div>
            {deleteEducation && (
              <a href="#!" onClick={() => deleteEducation(edu._id)}>
                <i className="fas fa-trash delete"></i>
              </a>
            )}
            <p>
              &#127891; {edu.current ? "Studies" : "Studied"}{" "}
              <b>{edu.degree}</b> of <b>{edu.fieldOfStudy}</b> at{" "}
              <b>{edu.school}</b>
            </p>
            <small>
              from {formatDate(edu.from)} to{" "}
              {edu.current ? "Current" : formatDate(edu.to)}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
