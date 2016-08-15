class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true, uniqueness: true
  validates :password, length:{minimum: 6, allow_nil: true}

  has_attached_file :picture, default_url: "https://s3.amazonaws.com/gotgoodgames-dev/users/pictures/000/000/001/original/DefaultUserImg.png"
  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\Z/

  include PgSearch
  multisearchable :against => :username
  ## below allows for prefix search for users
  pg_search_scope :whose_username_starts_with,
                  :against => :username,
                  :using => {
                  :tsearch => {:prefix => true}
                  }

  has_many(
    :gameshelves,
    class_name: "Gameshelf",
    primary_key: :id,
    foreign_key: :gameshelf_id
  )

  has_many(
    :comments,
    class_name: "Comment",
    primary_key: :id,
    foreign_key: :comment_id
  )

  has_many(
    :reviews,
    class_name: "Review",
    primary_key: :id,
    foreign_key: :user_id
  )

  has_many :likes
  has_many :liked_reviews, :through => :likes, :source => :review

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]
    user = User.find_by(provider: provider, uid: uid)
    return user if user

    User.create(
      provider: provider,
      uid: uid,
      username: auth_hash[:extra][:raw_info][:name],
      password_digest: BCrypt::Password.create(SecureRandom.urlsafe_base64(16))
    )
  end

  ##### Might be useful later to create a count of ongoing reviews #####
  #
  # def self.num_posts
  #   num_posts = {}
  #
  #   Author
  #     .joins("LEFT OUTER JOIN posts ON posts.author_id = authors.id")
  #     .group(:id)
  #     .select("authors.*, COUNT(posts.id) AS num_posts")
  #     .each do |author|
  #       num_posts[author] = author.num_posts
  #     end
  #
  #   num_posts
  # end
  #

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  # check validity of password
  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
