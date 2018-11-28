class ListingSerializer < ActiveModel::Serializer
    attributes :title, :body, :reserve, :currentbid
end