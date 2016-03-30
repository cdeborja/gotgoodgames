class StaticPagesController < ApplicationController
  before_action :require_signed_in!
  def homepage
  end
end
