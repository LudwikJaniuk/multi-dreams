import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Tooltip } from "react-tippy";
import ReactMarkdown from "react-markdown";

import TextField from "components/TextField";
import Button from "components/Button";
import IconButton from "components/IconButton";
import { EditIcon } from "components/Icons";

const EDIT_DESCRIPTION_MUTATION = gql`
  mutation EditDescription($dreamId: ID!, $description: String) {
    editDream(dreamId: $dreamId, description: $description) {
      id
      description
    }
  }
`;

export default ({ description, dreamId, canEdit }) => {
  const [editDream, { loading }] = useMutation(EDIT_DESCRIPTION_MUTATION, {
    variables: { dreamId },
  });

  const { handleSubmit, register, errors } = useForm();

  const [editing, setEditing] = useState(false);

  if (editing)
    return (
      <form
        onSubmit={handleSubmit((variables) =>
          editDream({ variables })
            .then(() => setEditing(false))
            .catch((err) => alert(err.message))
        )}
      >
        <TextField
          name="description"
          placeholder="Description"
          inputRef={register}
          multiline
          rows={10}
          defaultValue={description}
          autoFocus
          className="mb-2"
        />
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600 font-medium pl-4">
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_/blank"
              className="hover:text-gray-800 border-b hover:border-gray-800"
            >
              Markdown
            </a>{" "}
            allowed
          </div>
          <div className="flex">
            <Button
              onClick={() => setEditing(false)}
              variant="secondary"
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    );

  if (description)
    return (
      <div className="relative group pb-4">
        <ReactMarkdown
          source={description}
          className="markdown"
          renderers={{
            link: (props) => (
              <a href={props.href} target="_blank">
                {props.children}
              </a>
            ),
          }}
        />
        {canEdit && (
          <div className="absolute top-0 right-0 invisible group-hover:visible">
            <Tooltip title="Edit description" position="bottom" size="small">
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon className="h-6 w-6" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    );

  if (canEdit)
    return (
      <button
        onClick={() => setEditing(true)}
        className="block w-full h-64 text-gray-600 font-semibold rounded-lg border-3 border-dashed focus:outline-none focus:bg-gray-100 hover:bg-gray-100 mb-4"
      >
        + Description
      </button>
    );
  return null;
};
