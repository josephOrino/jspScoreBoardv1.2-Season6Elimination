--[[
      OBS Studio Lua script : Control the g4ScoreBoard with hotkeys    
--]]


local obs = obslua
local debug
local hk = {}
local hotkeyP1ScoreUp = 0;
local hotkeyP1ScoreDown = 0;
local hotkeyP2ScoreUp = 0;
local hotkeyP2ScoreDown = 0;
local hotkeyP1FoulAdd = 0;
local hotkeyP1FoulSub = 0;
local hotkeyP2FoulAdd = 0;
local hotkeyP2FoulSub = 0;
local hotkeyScoreReset = 0;
local hotkeyQtrAdd = 0;
local hotkeyQtrSub = 0;


local hotkeys = {
	P1_SCR_UP = "MJ - Player 1 Score +1",
	P1_SCR_DOWN = "MJ - Player 1 Score -1",
	P2_SCR_UP = "MJ - Player 2 Score +1",
	P2_SCR_DOWN = "MJ - Player 2 Score -1",
	SCR_RESET = "MJ - Score Reset",
	QTR_ADD = "MJ - Quarter Add",
	QTR_SUB = "MJ - Quarter Sub",
	P1_FL_ADD = "MJ - Player 1 Foul +1",
	P1_FL_SUB = "MJ - Player 1 Foul -1",
	P2_FL_ADD = "MJ - Player 2 Foul +1",
	P2_FL_SUB = "MJ - Player 2 Foul -1",
		
}

-- add any custom actions here
local function onHotKey(action)
	--obs.timer_remove(rotate)
	if debug then obs.script_log(obs.LOG_INFO, string.format("Hotkey : %s", action)) end

	if action == "P1_SCR_UP" then
		if hotkeyP1ScoreUp == 0 then
			hotkeyP1ScoreUp = 1
		else
			hotkeyP1ScoreUp = 0
		end
		update_hotkeys_js()
	elseif action == "P1_SCR_DOWN" then
		if hotkeyP1ScoreDown == 0 then
			hotkeyP1ScoreDown = 1
		else
			hotkeyP1ScoreDown = 0
		end
		update_hotkeys_js()
	elseif action == "P2_SCR_UP" then
		if hotkeyP2ScoreUp == 0 then
			hotkeyP2ScoreUp = 1
		else
			hotkeyP2ScoreUp = 0
		end
		update_hotkeys_js()
	elseif action == "P2_SCR_DOWN" then
		if hotkeyP2ScoreDown == 0 then
			hotkeyP2ScoreDown = 1
		else
			hotkeyP2ScoreDown = 0
		end
		update_hotkeys_js()
	elseif action == "SCR_RESET" then
		if hotkeyScoreReset == 0 then
			hotkeyScoreReset = 1
		else
			hotkeyScoreReset = 0
		end
		update_hotkeys_js()
	elseif action == "QTR_ADD" then
		if hotkeyQtrAdd == 0 then
			hotkeyQtrAdd = 1
		else
			hotkeyQtrAdd = 0
		end
		update_hotkeys_js()
	elseif action == "QTR_SUB" then
		if hotkeyQtrSub == 0 then
			hotkeyQtrSub = 1
		else
			hotkeyQtrSub = 0
		end
		update_hotkeys_js()
	elseif action == "P1_FL_ADD" then
		if hotkeyP1FoulAdd == 0 then
			hotkeyP1FoulAdd = 1
		else
			hotkeyP1FoulAdd = 0
		end
		update_hotkeys_js()
	elseif action == "P1_FL_SUB" then
		if hotkeyP1FoulSub == 0 then
			hotkeyP1FoulSub = 1
		else
			hotkeyP1FoulSub = 0
		end
		update_hotkeys_js()
	elseif action == "P2_FL_ADD" then
		if hotkeyP2FoulAdd == 0 then
			hotkeyP2FoulAdd = 1
		else
			hotkeyP2FoulAdd = 0
		end
		update_hotkeys_js()
	elseif action == "P2_FL_SUB" then
		if hotkeyP2FoulSub == 0 then
			hotkeyP2FoulSub = 1
		else
			hotkeyP2FoulSub = 0
		end
		update_hotkeys_js()
	end
end


-- write settings to js file
function update_hotkeys_js()
    local output = assert(io.open(script_path() .. 'hotkeys.js', "w"))
    output:write('hotkeyP1ScoreUp = '.. hotkeyP1ScoreUp .. ';\n')
    output:write('hotkeyP1ScoreDown = '.. hotkeyP1ScoreDown .. ';\n')
    output:write('hotkeyP2ScoreUp = '.. hotkeyP2ScoreUp .. ';\n')
    output:write('hotkeyP2ScoreDown = '.. hotkeyP2ScoreDown .. ';\n')
	output:write('hotkeyScoreReset = '.. hotkeyScoreReset .. ';\n')
	output:write('hotkeyQtrAdd = '.. hotkeyQtrAdd .. ';\n')
	output:write('hotkeyQtrSub = '.. hotkeyQtrSub .. ';\n')
	output:write('hotkeyP1FoulAdd = '.. hotkeyP1FoulAdd .. ';\n')
	output:write('hotkeyP1FoulSub = '.. hotkeyP1FoulSub .. ';\n')
	output:write('hotkeyP2FoulAdd = '.. hotkeyP2FoulAdd .. ';\n')
	output:write('hotkeyP2FoulSub = '.. hotkeyP2FoulSub .. ';\n')
	output:close()
end

----------------------------------------------------------

-- called on startup
function script_load(settings)
	function pairsByKeys (t, f)
		local a = {}
		for n in pairs(t) do table.insert(a, n) end
		table.sort(a, f)
		local i = 0
		local iter = function ()
		  i = i + 1
		  if a[i] == nil then return nil
		  else return a[i], t[a[i]]
		  end
		end
		return iter
	end	

	for name, line in pairsByKeys(hotkeys) do
		hk[name] = obs.obs_hotkey_register_frontend(name, line, function(pressed) if pressed then onHotKey(name) end end)
		local hotkeyArray = obs.obs_data_get_array(settings, name)
		obs.obs_hotkey_load(hk[name], hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end	
	update_hotkeys_js()
end


-- called on unload
function script_unload()
end


-- called when settings changed
function script_update(settings)
	debug = obs.obs_data_get_bool(settings, "debug")
end


-- return description shown to user
function script_description()
	return "Control the g4ScoreBoard with hotkeys"
end


-- define properties that user can change
function script_properties()
	local props = obs.obs_properties_create()
	obs.obs_properties_add_bool(props, "debug", "Debug")
	return props
end


-- set default values
function script_defaults(settings)
	obs.obs_data_set_default_bool(settings, "debug", false)
end


-- save additional data not set by user
function script_save(settings)
	for k, v in pairs(hotkeys) do
		local hotkeyArray = obs.obs_hotkey_save(hk[k])
		obs.obs_data_set_array(settings, k, hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end
end