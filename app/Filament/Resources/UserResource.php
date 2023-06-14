<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TagsColumn;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    protected static ?string $navigationGroup = 'Administration';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.name')))
                    ->required(),
                TextInput::make('email')
                    ->required()
                    ->email()
                    ->unique(table: static::$model, ignorable: fn ($record) => $record)
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.email'))),
                TextInput::make('password')
                    ->same('passwordConfirmation')
                    ->password()
                    ->maxLength(255)
                    ->required(fn ($component, $get, $livewire, $model, $record, $set, $state) => $record === null)
                    ->dehydrateStateUsing(fn ($state) => ! empty($state) ? Hash::make($state) : '')
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.password'))),
                TextInput::make('passwordConfirmation')
                    ->password()
                    ->dehydrated(false)
                    ->maxLength(255)
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.confirm_password'))),
                Select::make('roles')
                    ->multiple()
                    ->relationship('roles', 'name')
                    ->preload(config('filament-authentication.preload_roles'))
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.roles'))),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->sortable()
                    ->label(strval(__('filament-authentication::filament-authentication.field.id'))),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.name'))),
                TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.email'))),
                IconColumn::make('email_verified_at')
                    ->options([
                        'heroicon-o-check-circle',
                        'heroicon-o-x-circle' => fn ($state): bool => $state === null,
                    ])
                    ->colors([
                        'success',
                        'danger' => fn ($state): bool => $state === null,
                    ])
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.verified_at'))),
                TagsColumn::make('roles.name')
                    ->sortable()
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.roles'))),
                TextColumn::make('created_at')
                    ->dateTime('Y-m-d H:i:s')
                    ->label(strval(__('filament-authentication::filament-authentication.field.user.created_at'))),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
