module ApplicationHelper
  def auth_token
  <<-HEREDOC.html_safe
  <input type="hidden"
  name=authenticity_token
  value="#{form_authenticity_token}">
  HEREDOC
  end
end
