import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import TextField from "components/TextField";
import Button from "components/Button";
import Avatar from "components/Avatar";

const ADD_COMMENT = gql`
  mutation addComment($content: String!, $dreamId: ID!) {
    addComment(content: $content, dreamId: $dreamId) {
      id
      numberOfComments
      comments {
        id
        content
        createdAt
        author {
          id
          name
          avatar
        }
      }
    }
  }
`;

const AddComment = ({ currentUser, dreamId }) => {
  const [addComment] = useMutation(ADD_COMMENT);
  const [content, setContent] = React.useState("");
  const { handleSubmit, register, errors } = useForm();
  const inputRef = React.useRef();

  return (
    <form
      onSubmit={handleSubmit(() => {
        addComment({ variables: { content, dreamId } })
          .then(() => {
            inputRef.current.blur();
            setContent("");
          })
          .catch((err) => alert(err.message));
      })}
    >
      <div className="flex">
        <div className="mr-4">
          <Avatar user={currentUser} />
        </div>
        <div className="flex-grow">
          <div className="mb-2">
            <TextField
              name="content"
              placeholder="Add comment"
              multiline
              rows={1}
              error={Boolean(errors.content)}
              helperText={errors.content?.message}
              value={content}
              inputProps={{
                value: content,
                onChange: (e) => setContent(e.target.value),
              }}
              inputRef={(e) => {
                register({ required: "Required" });
                inputRef.current = e;
              }}
            />
          </div>
          {content.length > 0 && (
            <div className="flex justify-end">
              <Button
                onClick={() => setContent("")}
                variant="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={content.length === 0}
                color="primary"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddComment;
