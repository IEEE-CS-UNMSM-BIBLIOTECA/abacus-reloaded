/* document */

export interface DocumentTypeBase {
  id:        number;
  title:     string;
}

export interface DocumentType extends DocumentTypeBase {
  cover_url:             string;
  authors:               AuthorBaseType[];
  isbn:                  string;
  description:           string;
  publication_year:      number | null;
  acquisition_date:      string;
  edition:               string;
  external_lend_allowed: boolean;
  total_pages:           number;
  base_price:            number;
  total_copies:          number;
  available_copies:      number;
  mean_rating:           number | null;
  language:              LanguageType;
  format:                DocumentFormatType;
  publisher:             PublisherType;
  tags:                  TagBaseType[];
}

/* review */

export interface ReviewType {
  id:          number;
  title:       string;
  content:     string;
  rating:      number;
  total_likes: number;
  spoiler:     boolean;
  user:        UserBaseType;
  document:    DocumentTypeBase;
}

/* user */

export interface UserBaseType {
  id:                  number;
  username:            string;
  // profile_picture_url: string;
}

export interface UserType extends UserBaseType {
  address:      string;
  birth_date:   string;
  email:        string;
  gender:       GenderType;
  mobile_phone: string;
  name:         string;
  role:         RoleType;
}

/* list */

export interface ListType {
  id:             number;
  title:          string;
  total_likes:    number;
  total_books:    number;
  private:        boolean;
  user:           UserBaseType;
}

/* author */

export interface AuthorBaseType extends BaseEntity {}

export interface AuthorType extends AuthorBaseType {
  // image_url:  string;
  bio:        string;
  birth_date: string;
  death_date: string | null;
}

/* tag */

export interface TagBaseType extends BaseEntity {}

export interface TagType extends TagType {
  mean_rating: number;
}

/* order */

export interface OrderType {
  id:                 number;
  document:           DocumentTypeBase;
  user:               UserBaseType;
  order_date:         string;
  max_return_date:    string;
  actual_return_date: string | null;
}

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
