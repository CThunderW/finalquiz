class CreateListings < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.string :title
      t.text :body
      t.integer :reserve
      t.integer :currentbid

      t.timestamps
    end
  end
end
