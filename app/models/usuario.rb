class Usuario < ActiveRecord::Base
  attr_accessible :nombre
  has_many :notums
end
