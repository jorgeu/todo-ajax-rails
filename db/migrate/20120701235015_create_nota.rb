class CreateNota < ActiveRecord::Migration
  def change
    create_table :nota do |t|
      t.string :titulo
      t.string :contenido
      t.references :usuario

      t.timestamps
    end
    add_index :nota, :usuario_id
  end
end
