class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :text
      t.boolean :edited
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :recipient_id, null: false

      t.timestamps
    end
  end
end
