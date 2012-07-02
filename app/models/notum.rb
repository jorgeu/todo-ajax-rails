class Notum < ActiveRecord::Base
  belongs_to :usuario
  attr_accessible :contenido, :titulo, :usuario_id
end
