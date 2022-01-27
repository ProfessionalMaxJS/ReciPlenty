class Backend::PreviewsController < ApplicationController

def create
    # byebug
    functional_params = preview_params.merge(:user_id => @current_user.id)
    small_shot = Preview.create!(functional_params)
    render json: small_shot, status: :created
end

private
def preview_params
    params.permit(:pic)
end

end