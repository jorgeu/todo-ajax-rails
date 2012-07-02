class UsuariosController < ApplicationController
  
  def byname
    @usuario = Usuario.find_by_nombre(params[:nombre])
    if(@usuario)
        respond_to do |format|
            format.json { render json: @usuario }
        end
    else
        respond_to do |format|
          format.json { head :no_content }
        end
    end
  end 
  
  # GET /usuarios/1.json
  def show
    @usuario = Usuario.find(params[:id])

    respond_to do |format|
      format.json { render json: @usuario }
    end
  end

  # POST /usuarios.json
  def create
    @usuario = Usuario.new()
    @usuario.nombre=params[:nombre];

    respond_to do |format|
      if @usuario.save
        format.json { render json: @usuario, status: :created, location: @usuario }
      else
        format.json { render json: @usuario.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /usuarios/1.json
  def update
    @usuario = Usuario.find(params[:id])

    respond_to do |format|
      if @usuario.update_attributes(params[:usuario])
        format.json { head :no_content }
      else
        format.json { render json: @usuario.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /usuarios/1.json
  def destroy
    @usuario = Usuario.find(params[:id])
    @usuario.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
