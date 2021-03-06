import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

import DreamCustomField from "./DreamCustomField";

const CUSTOM_FIELDS_QUERY = gql`
  query CustomFields($slug: String!) {
    event(slug: $slug) {
      id
      customFields {
        id
        name
        description
        type
        isRequired
        isShownOnFrontPage
      }
    }
  }
`;

export default ({ customFields, canEdit, eventId, dreamId }) => {
  const router = useRouter();
  const { data } = useQuery(CUSTOM_FIELDS_QUERY, {
    variables: { slug: router.query.event },
  });

  if (!data) {
    return <></>;
  }

  // TODO: can use the custom fields already fetched in the event query in _app
  const { customFields: defaultCustomFields } = data.event;

  return defaultCustomFields.map((defaultCustomField, index) => {
    const customField = customFields.filter(
      (field) => field.customField?.id == defaultCustomField.id
    );
    return (
      <DreamCustomField
        key={defaultCustomField.id}
        defaultCustomField={defaultCustomField}
        customField={
          customField && customField.length > 0 ? customField[0] : null
        }
        eventId={eventId}
        dreamId={dreamId}
        canEdit={canEdit}
      />
    );
  });
};
