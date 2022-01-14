require "rails_helper"

RSpec.describe SavedRecipesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/saved_recipes").to route_to("saved_recipes#index")
    end

    it "routes to #show" do
      expect(get: "/saved_recipes/1").to route_to("saved_recipes#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/saved_recipes").to route_to("saved_recipes#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/saved_recipes/1").to route_to("saved_recipes#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/saved_recipes/1").to route_to("saved_recipes#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/saved_recipes/1").to route_to("saved_recipes#destroy", id: "1")
    end
  end
end
