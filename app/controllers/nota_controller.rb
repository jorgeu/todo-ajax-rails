class NotaController < ApplicationController

  # GET /nota/1.json
  def show
    @notum = Notum.find(params[:id])

    respond_to do |format|
      format.json { render json: @notum }
    end
  end
  
  def byuserid
    @notum = Notum.find_all_by_usuario_id(params[:id])
    respond_to do |format|
      format.json { render json: @notum }
    end
  end

  # POST /nota.json
  def create
    @notum = Notum.new(params[:notum])

    respond_to do |format|
      if @notum.save
        format.json { render json: @notum, status: :created, location: @notum }
      else
        format.json { render json: @notum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /nota/1.json
  def update
    @notum = Notum.find(params[:id])

    respond_to do |format|
      if @notum.update_attributes(params[:notum])
        format.json { head :no_content }
      else
        format.json { render json: @notum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /nota/1.json
  def destroy
    @notum = Notum.find(params[:id])
    @notum.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
