<?php

namespace App\Services;

use GuzzleHttp\Client;

class RajaOngkirService
{
    protected $origin = '501'; // Diambil dari id kota DI Yogyakarta di RajaOngkir

    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    protected function request($endpoint, $method = 'GET', $body = [])
    {
        try {
            $response = $this->client->request($method, config('services.rajaongkir.base_url').$endpoint, [
                'headers' => [
                    'key' => config('services.rajaongkir.api_key'),
                ],
                'form_params' => $body,
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function getProvinces()
    {
        return $this->request('/province');
    }

    public function getCities()
    {
        return $this->request('/city');
    }

    public function cost($payload)
    {
        $response = $this->request('/cost', 'POST', [
            'origin' => $this->origin,
            'destination' => $payload['destination'],
            'weight' => $payload['weight'],
            'courier' => $payload['courier'],
        ]);

        return $response['rajaongkir']['results'];
    }
}
