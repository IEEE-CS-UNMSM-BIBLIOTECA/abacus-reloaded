/* document */

interface DocumentNonKeyFields {
  title:                 string;
  cover_url:             string;
  isbn:                  string;
  description:           string;
  publication_year:      number;
  acquisition_date:      string;
  edition:               number;
  external_lend_allowed: boolean;
  total_pages:           number;
  base_price:            number;
  total_copies:          number;
  available_copies:      number;
  mean_rating:           number | null;
}

export interface DocumentType extends DocumentNonKeyFields {
  id:        number;
  authors:   AuthorBaseType[];
  language:  LanguageType;
  format:    DocumentFormatType;
  publisher: PublisherType;
  tags:      TagBaseType[];
}

export interface SubmitDocumentPayload extends Omit<DocumentNonKeyFields, "mean_rating"> {
  authors_id:   number[];
  language_id:  number;
  format_id:    number;
  publisher_id: number;
  tags_id:      number[];
}

export interface DocumentTypeBase {
  id:    number;
  title: string;
}

/* review */

interface ReviewNonKeyFields {
  title:       string;
  content:     string;
  rating:      number;
  total_likes: number;
  spoiler:     boolean;
}

export interface ReviewType {
  id:          number;
  user:        UserBaseType;
  document:    DocumentTypeBase;
}

/* user */

interface UserNonKeyFields {
  name:                  string;
  username:              string;
  email:                 string;
  address:               string;
  birth_date:            string;
  mobile_phone:          string;
  // profile_picture_url:   string;
}

export interface UserType extends UserNonKeyFields {
  role:   RoleType;
  gender: GenderType;
}

export interface SubmitUserPayload extends UserNonKeyFields {
  role_id:   number;
  gender_id: number;
}

export interface UserBaseType {
  id:                  number;
  username:            string;
}

/* list */

export interface ListNonKeyFields {
  title:       string;
  total_likes: number;
  total_books: number;
  private:     boolean;
  user:        UserBaseType;
}

export interface ListType extends ListNonKeyFields {
  id:        number;
}

/* author */

interface AuthorNonKeyFields {
  bio:        string;
  birth_date: string;
  death_date: string | null;
}

export interface AuthorType extends AuthorBaseType {
  id:      number;
  gender:  GenderType;
  country: CountryType;
}

export interface SubmitAuthorPayload extends AuthorNonKeyFields {
  gender_id:  number;
  country_id: number;
}

export interface AuthorBaseType extends BaseEntity {}

/* order */

interface OrderNonKeyFields {
  order_date:         string;
  max_return_date:    string;
  actual_return_date: string | null;
}

export interface OrderType extends OrderNonKeyFields {
  id:       number;
  document: DocumentTypeBase;
  user:     UserBaseType;
}

export interface SubmitOrderPayload extends OrderNonKeyFields {
  document_id: number;
  user_id:     number;
}

/* tag */

interface TagNonKeyFields {
  name:        string;
  mean_rating: number;
}

export interface TagType extends TagNonKeyFields {
  id: number;
}

export interface SubmitTagPayload extends TagNonKeyFields {}

export interface TagBaseType extends BaseEntity {}

/* auth */

export interface SignupPayload {
  username:     string;
  password:     string;
  address:      string;
  birth_date:   string;
  email:        string;
  gender_id:    number;
  name:         string;
  mobile_phone: string;
  role_id:      number;
}

export interface SigninPayload {
  username: string;
  password: string;
}

/* other */

export interface RoleType extends BaseEntity {}

export interface DocumentFormatType extends BaseEntity {}

export interface PublisherType extends BaseEntity {}

export interface GenderType extends BaseEntity {}

export interface LanguageType extends BaseEntity {}

export interface CountryType extends BaseEntity {}

/* internal */

interface BaseEntity {
  id:   number;
  name: string;
}

export interface OptionType {
  label:   string;
  onClick: () => void;
}
