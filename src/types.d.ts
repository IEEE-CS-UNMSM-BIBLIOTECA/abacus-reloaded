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

export interface Document extends DocumentNonKeyFields {
  id:        number;
  authors:   BasicAuthor[];
  language:  Language;
  format:    DocumentFormat;
  publisher: Publisher;
  tags:      BasicTag[];
}

export interface CreateDocumentFormData extends Omit<DocumentNonKeyFields, "mean_rating"> {
  authors_id:   string[];
  language_id:  string;
  format_id:    string;
  publisher_id: string;
  tags_id:      string[];
}

export interface CreateDocumentPayload extends Omit<DocumentNonKeyFields, "mean_rating"> {
  authors_id:   number[];
  language_id:  number;
  format_id:    number;
  publisher_id: number;
  tags_id:      number[];
}

export interface BasicDocument {
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

export interface Review extends ReviewNonKeyFields {
  id:          number;
  user:        BasicUser;
  document:    BasicDocument;
}

/* user */

interface UserNonKeyFields {
  name:                  string;
  username:              string;
  email:                 string;
  address:               string;
  birth_date:            string;
  mobile_phone:          string;
}

export interface User extends UserNonKeyFields {
  role:   Role;
  gender: Gender;
}

export interface CreateUserPayload extends UserNonKeyFields {
  role_id:   number;
  gender_id: number;
}

export interface BasicUser {
  id:              number;
  username:        string;
}

/* list */

export interface ListNonKeyFields {
  title:       string;
  total_likes: number;
  total_books: number;
  private:     boolean;
  user:        BasicUser;
}

export interface List extends ListNonKeyFields {
  id:        number;
}

/* author */

interface AuthorNonKeyFields {
  name:        string;
  death_date?: string | null;
  birth_date?: string;
  bio:         string;
}

export interface Author extends BasicAuthor {
  id:      number;
  gender:  Gender;
  country: Country;
}

export interface CreateAuthorPayload extends AuthorNonKeyFields {
  gender_id:  number;
  country_id: number;
}

export interface BasicAuthor extends BaseEntity {}

/* order */

interface OrderNonKeyFields {
  order_date:         string;
  max_return_date:    string;
  actual_return_date: string | null;
}

export interface Order extends OrderNonKeyFields {
  id:       number;
  document: BasicDocument;
  user:     BasicUser;
}

export interface CreateOrderPayload extends OrderNonKeyFields {
  document_id: number;
  user_id:     number;
}

/* tag */

interface TagNonKeyFields {
  name:        string;
  mean_rating: number;
}

export interface Tag extends TagNonKeyFields {
  id: number;
}

export type CreateTagPayload = Omit<TagNonKeyFields, "mean_rating">

export interface BasicTag extends BaseEntity {}

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

/* publisher */

export interface PublisherNonKeyFields {
  name: string;
}

export interface Publisher extends PublisherNonKeyFields {
  id: number;
}

export type CreatePublisherPayload = PublisherNonKeyFields

/* other */

export interface Role extends BaseEntity {}

export interface DocumentFormat extends BaseEntity {}

export interface Gender extends BaseEntity {}

export interface Language extends BaseEntity {}

export interface Country extends BaseEntity {}

/* internal */

interface BaseEntity {
  id:   number;
  name: string;
}

export interface SearchableSelectOption {
  value: string;
  label: string;
}

export interface MenuOption {
  label:   string;
  onClick: () => void;
}
