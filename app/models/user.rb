class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length:{minimum: 6, allow_nil: true}

=begin
  future associations of Users with other models
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
    foreign_key: :review_id
  )

  has_many(
    :ratings,
    class_name: "Rating",
    primary_key: :id,
    foreign_key: :rating_id
  )
=end

  attr_reader :password

  after_intialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user && user.valid_password?(password)
    user
  end

  #sets password that cannot be easily deciphered
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
