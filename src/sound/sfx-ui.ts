export const sfx_button = {
    "oldParams": true,
    "wave_type": 1,
    "p_env_attack": 0,
    "p_env_sustain": 0.011865020903832235,
    "p_env_punch": 0.30895536338441726,
    "p_env_decay": 0.10919225163293156,
    "p_base_freq": 0.600326884813042,
    "p_freq_limit": 0,
    "p_freq_ramp": 0,
    "p_freq_dramp": 0,
    "p_vib_strength": 0,
    "p_vib_speed": 0,
    "p_arp_mod": 0,
    "p_arp_speed": 0,
    "p_duty": 0,
    "p_duty_ramp": 0,
    "p_repeat_speed": 0,
    "p_pha_offset": 0,
    "p_pha_ramp": 0,
    "p_lpf_freq": 1,
    "p_lpf_ramp": 0,
    "p_lpf_resonance": 0,
    "p_hpf_freq": 0,
    "p_hpf_ramp": 0,
    "sound_vol": 0.05,
    "sample_rate": 44100,
    "sample_size": 8
}

export const sfx_button_sound = new SoundEffect(
    Object.assign(new Params(), sfx_button).mutate().mutate().mutate()
)
    .generate()
    .getAudio()

export const sfx_button_play = () => {
    sfx_button_sound.play()
}